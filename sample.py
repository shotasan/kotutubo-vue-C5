# 列数
def column():
    return list(range(1, 10))

# 列数を等倍したリストを作成し、先頭行と一列目を追加して出力


def main():
    base_list = []
    for i in column():
        base_list.append(multiple(i))
    add_top_line(base_list)
    result = convert_digits(base_list)
    for res in result:
        print(*res)

# カラムを等倍し、先頭列を追加


def multiple(i):
    tmp = []
    for j in column():
        tmp.append(i * j)
    tmp.insert(0, i)
    return tmp

# 一行目のリストを追加する


def add_top_line(base_list):
    col = column()
    col.insert(0, ' ')
    base_list.insert(0, col)
    return base_list

# 桁数を揃える


def convert_digits(base_list):
    base_list = map(lambda lists: [str(lis).rjust(2)
                                   for lis in lists], base_list)
    return list(base_list)


main()
